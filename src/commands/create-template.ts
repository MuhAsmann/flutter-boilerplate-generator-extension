import * as vscode from "vscode";
import * as fs from "fs-extra";
import * as path from "path";
import { exec } from "child_process";
import { Writer } from "../writer";

export function createTemplate() {
  return vscode.commands.registerCommand(
    "flutter-generator-boilerplate.leoGenerator",
    async () => {
      const folderName = await vscode.window.showInputBox();
      if (!folderName) {
        vscode.window.showErrorMessage("Masukkan nama folder");
        return;
      }
      const extractFolderName = folderName?.replaceAll(" ", "_").toLowerCase();
      const extensionPath = vscode.extensions.all.find((ext) =>
        ext.extensionPath.includes("flutter-generator-boilerplate")
      )?.extensionPath;

      if (!extensionPath) {
        vscode.window.showErrorMessage("Tidak ada extensi yang dituju");
        return;
      }

      const pickPlatforms = await vscode.window.showQuickPick(
        ["android", "ios", "web", "windows", "macos"],
        {
          placeHolder: "Select Platforms",
          canPickMany: true,
        }
      );

      if (!pickPlatforms || pickPlatforms.length === 0) {
        vscode.window.showErrorMessage("Pilih platform setidaknya 1");
        return;
      }

      const templateDirectory = path.join(extensionPath, "src", "template");

      const sourceUri = await vscode.window.showOpenDialog({
        canSelectFolders: true,
        canSelectFiles: false,
        canSelectMany: false,
        openLabel: "Pilih Folder Sumber",
      });

      if (!sourceUri) {
        vscode.window.showErrorMessage("Tidak ada folder yang terbuka.");
        return;
      }

      try {
        const userDirectory = path.join(sourceUri[0].fsPath, extractFolderName);
        await fs.mkdir(userDirectory);
        runFlutterCommand(
          userDirectory,
          pickPlatforms,
          templateDirectory,
          extractFolderName
        );
      } catch (error) {
        vscode.window.showInformationMessage(`Gagal membuat template`);
      }
    }
  );
}

function runFlutterCommand(
  userDirectory: string,
  selectedPlatforms: string[],
  templateDirectory: string,
  folderName: string
) {
  const command = `flutter create ${userDirectory} --platforms=${selectedPlatforms.join(
    ","
  )}`;

  vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: "Sedang mempersiapkan template😊",
      cancellable: false,
    },
    async (progress) => {
      return new Promise<void>((resolve, reject) => {
        exec(command, async (error, _, __) => {
          if (error) {
            vscode.window.showErrorMessage("Oops! Sepertinya ada kesalahan");
            reject();
          }

          try {
            const pubspecYaml = path.join(userDirectory, "pubspec.yaml");

            progress.report({ message: "Membersihkan default folder" });
            await fs.remove(path.join(userDirectory, "lib"));

            progress.report({ message: "Menyalin template" });
            await fs.copy(templateDirectory, userDirectory);

            progress.report({ message: "Menghapus pubspec.yaml" });
            await fs.remove(pubspecYaml);

            progress.report({
              message: "Menyalin pubspec.yaml sesuai template",
            });
            await fs.writeFile(pubspecYaml, Writer.pubspecWriter(folderName));
          } catch (fileError) {
            vscode.window.showErrorMessage(
              "Operasi telah gagal karena sesuatu, silahkan mengulanginya"
            );
          }
        });

        progress.report({ message: "Menjalankan Pubspec" });
        exec("flutter pub get", (error, _, __) => {
          if (error) {
            vscode.window.showErrorMessage(
              "Gagal menjalankan pubspec, silahkan menjalankan manual"
            );
            reject();
          }
        });

        vscode.window.showInformationMessage(
          "Template berhasil dibuat, selamat menggunakan✌️😊 "
        );
        resolve();
      });
    }
  );
}
