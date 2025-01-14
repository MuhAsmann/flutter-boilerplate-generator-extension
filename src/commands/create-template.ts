import * as vscode from "vscode";
import * as fs from "fs-extra";
import * as path from "path";
import { Writer } from "../writer";
import { getFolderName } from "../utils/folder_name_utils";
import { execPromise } from "../utils/execute_promise";

export function createTemplate() {
  return vscode.commands.registerCommand(
    "flutter-generator-boilerplate.createTemplate",
    async () => {
      const folderName = await getFolderName();
      if (!folderName) return;

      let extensionPath: string | null = "";
      if (process.env.ENVIRONMENT === "production") {
        extensionPath =
          vscode.extensions.all.find((ext) =>
            ext.extensionPath.includes("flutter-generator-boilerplate")
          )?.extensionPath ?? null;
      } else {
        extensionPath = fs.realpathSync(path.join(__dirname, "..", ".."));
      }

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
        const userDirectory = path.join(sourceUri[0].fsPath, folderName);
        const folderExist = await fs.pathExists(userDirectory);
        if (folderExist) {
          vscode.window.showErrorMessage("Folder sudah ada, gunakan nama lain");
          return;
        }
        await fs.mkdir(userDirectory);
        runFlutterCommand(
          userDirectory,
          pickPlatforms,
          templateDirectory,
          folderName
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
      return new Promise<void>(async (resolve, reject) => {
        try {
          await execPromise(command);

          const pubspecYaml = path.join(userDirectory, "pubspec.yaml");

          progress.report({ message: "Membersihkan default folder" });
          await fs.remove(path.join(userDirectory, "lib")).catch(reject);

          progress.report({ message: "Menyalin template" });
          await fs.copy(templateDirectory, userDirectory).catch(reject);

          progress.report({ message: "Menghapus pubspec.yaml" });
          await fs.remove(pubspecYaml).catch(reject);

          progress.report({
            message: "Menyalin pubspec.yaml sesuai template",
          });
          await fs
            .writeFile(pubspecYaml, Writer.pubspecWriter(folderName))
            .catch(reject);

          progress.report({ message: "Menjalankan Pubspec" });
          await execPromise(
            `cd ${userDirectory} && code . --reuse-window && flutter pub get`
          ).catch(reject);

          vscode.window.showInformationMessage(
            "Template berhasil dibuat, selamat menggunakan✌️😊"
          );

          resolve();
        } catch (error) {
          vscode.window.showErrorMessage(
            `Operasi telah gagal karena sesuatu, silahkan mengulanginya | ${error}`
          );
          reject(error);
        }
      });
    }
  );
}
