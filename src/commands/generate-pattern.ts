import * as fs from "fs-extra";
import path from "path";
import * as vscode from "vscode";
import { getFolderName } from "../utils/folder_name_utils";
import { PatternContent } from "../contents/pattern-content";

export function generatePattern() {
  return vscode.commands.registerCommand(
    "flutter-generator-boilerplate.generatePattern",
    async () => {
      const currentWorkspace = vscode.workspace.workspaceFolders;
      if (!currentWorkspace || currentWorkspace.length === 0) {
        vscode.window.showErrorMessage("Tidak ada workspace yang terbuka");
        return;
      }

      const modulePath = path.join(
        currentWorkspace[0].uri.fsPath,
        "lib",
        "modules"
      );

      const isModuleFolderExist = await fs.pathExists(modulePath);
      if (!isModuleFolderExist) {
        vscode.window.showErrorMessage("Folder lib/modules tidak ditemukan ");
        return;
      }

      const folderName = await getFolderName();

      if (!folderName) return;

      const isModuleExist = await fs.pathExists(
        path.join(modulePath, folderName)
      );
      if (isModuleExist) {
        vscode.window.showErrorMessage(
          `Folder ${folderName} sudah ada, silahkan menggunakan nama folder yang lain`
        );
        return;
      }

      vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Sedang membuat pattern🥰",
          cancellable: false,
        },
        (progress) => {
          return new Promise<void>(async (resolve, reject) => {
            try {
              const contentWriter = new PatternContent(folderName);
              const folderDestination = path.join(modulePath, folderName);

              const paths = {
                data: path.join(folderDestination, "data"),
                presentation: path.join(folderDestination, "presentation"),
              };

              const folderPaths = [
                folderDestination,
                paths.data,
                path.join(paths.data, "data_sources"),
                path.join(paths.data, "models"),
                path.join(paths.data, "repositores"),
                paths.presentation,
                path.join(paths.presentation, "bindings"),
                path.join(paths.presentation, "controllers"),
                path.join(paths.presentation, "pages"),
                path.join(paths.presentation, "widgets"),
              ];

              const filePaths = [
                {
                  path: path.join(
                    paths.data,
                    "data_sources",
                    `${folderName}_data_source.dart`
                  ),
                  writer: contentWriter.dataSource,
                },
                {
                  path: path.join(
                    paths.data,
                    "models",
                    `${folderName}_model.dart`
                  ),
                  writer: contentWriter.model,
                },
                {
                  path: path.join(
                    paths.data,
                    "repositores",
                    `${folderName}_repository.dart`
                  ),
                  writer: contentWriter.repository,
                },
                {
                  path: path.join(
                    paths.presentation,
                    "bindings",
                    `${folderName}_binding.dart`
                  ),
                  writer: contentWriter.binding,
                },
                {
                  path: path.join(
                    paths.presentation,
                    "controllers",
                    `${folderName}_controller.dart`
                  ),
                  writer: contentWriter.controller,
                },
                {
                  path: path.join(
                    paths.presentation,
                    "pages",
                    `${folderName}_page.dart`
                  ),
                  writer: contentWriter.page,
                },
                {
                  path: path.join(
                    paths.presentation,
                    "widgets",
                    `${folderName}_widget.dart`
                  ),
                  writer: contentWriter.widget,
                },
              ];

              await Promise.all(
                folderPaths.map(async (folder) => {
                  progress.report({ message: `Membuat folder ${folder}` });
                  await fs.ensureDir(folder);
                })
              );

              await Promise.all(
                filePaths.map(async ({ path, writer }) => {
                  progress.report({ message: `Membuat file ${path}` });
                  await fs.outputFile(path, writer);
                })
              );

              vscode.window.showInformationMessage(
                `Pattern berhasil dibuat, enjoyyy🥰🥰🥰`
              );
              resolve();
            } catch (error) {
              vscode.window.showErrorMessage(
                `Operasi telah gagal karena sesuatu, silahkan mengulanginya | ${error}`
              );
              reject();
            }
          });
        }
      );
    }
  );
}
