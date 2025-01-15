import * as vscode from "vscode";
import * as fs from "fs-extra";
import * as path from "path";
import { Writer } from "../writer";
import { getFolderName } from "../utils/folder_name_utils";
import { execPromise } from "../utils/execute_promise";
import * as template from "../contents/get-template";

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
        vscode.window.showErrorMessage("No target extension specified");
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
        vscode.window.showErrorMessage("Select at least one platform");
        return;
      }

      const sourceUri = await vscode.window.showOpenDialog({
        canSelectFolders: true,
        canSelectFiles: false,
        canSelectMany: false,
        openLabel: "Select Source Folder",
      });

      if (!sourceUri) {
        vscode.window.showErrorMessage("No folder is open.");
        return;
      }

      try {
        const userDirectory = path.join(sourceUri[0].fsPath, folderName);
        const folderExist = await fs.pathExists(userDirectory);
        if (folderExist) {
          vscode.window.showErrorMessage(
            "Folder already exists, please use a different name"
          );
          return;
        }
        await fs.mkdir(userDirectory);
        runFlutterCommand(userDirectory, pickPlatforms, folderName);
      } catch (error) {
        vscode.window.showInformationMessage(`Failed to create template`);
      }
    }
  );
}

function runFlutterCommand(
  userDirectory: string,
  selectedPlatforms: string[],
  folderName: string
) {
  const command = `flutter create ${userDirectory} --platforms=${selectedPlatforms.join(
    ","
  )}`;

  vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: "Preparing template😊",
      cancellable: false,
    },
    async (progress) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          await execPromise(command);

          const pubspecYaml = path.join(userDirectory, "pubspec.yaml");

          progress.report({ message: "Cleaning default folder" });
          await fs.remove(path.join(userDirectory, "lib")).catch(reject);

          progress.report({ message: "Removing pubspec.yaml" });
          await fs.remove(pubspecYaml).catch(reject);

          progress.report({
            message: "Copying pubspec.yaml according to template",
          });
          await fs
            .writeFile(pubspecYaml, Writer.pubspecWriter(folderName))
            .catch(reject);

          const pathLibFolder = path.join(userDirectory, "lib");
          const mainFolder = {
            core: path.join(pathLibFolder, "core"),
            modules: path.join(pathLibFolder, "modules"),
          };
          const coreChildrenFolder = {
            lang: path.join(mainFolder.core, "lang"),
            routers: path.join(mainFolder.core, "routers"),
            themes: path.join(mainFolder.core, "themes"),
          };
          const moduleChildFolder = path.join(mainFolder.modules, "demo");
          const demoChildrenFolder = {
            data: path.join(moduleChildFolder, "data"),
            presentation: path.join(moduleChildFolder, "presentation"),
          };
          const dataChildrenFolder = {
            data_sources: path.join(demoChildrenFolder.data, "data_sources"),
            models: path.join(demoChildrenFolder.data, "models"),
            repositories: path.join(demoChildrenFolder.data, "repositories"),
          };
          const presentationChildrenFolder = {
            pages: path.join(demoChildrenFolder.presentation, "pages"),
            bindings: path.join(demoChildrenFolder.presentation, "bindings"),
            controllers: path.join(
              demoChildrenFolder.presentation,
              "controllers"
            ),
            widgets: path.join(demoChildrenFolder.presentation, "widgets"),
          };
          const folderTasks = [
            pathLibFolder,
            mainFolder.core,
            coreChildrenFolder.lang,
            coreChildrenFolder.routers,
            coreChildrenFolder.themes,
            mainFolder.modules,
            moduleChildFolder,
            demoChildrenFolder.data,
            demoChildrenFolder.presentation,
            dataChildrenFolder.data_sources,
            dataChildrenFolder.models,
            dataChildrenFolder.repositories,
            presentationChildrenFolder.pages,
            presentationChildrenFolder.bindings,
            presentationChildrenFolder.controllers,
            presentationChildrenFolder.widgets,
          ];
          const coreTemplate = new template.GetTemplateCoreFolder(folderName);
          const moduleTemplate = new template.GetTemplateModulesFolder(
            folderName
          );
          const mainTemplate = new template.GetTemplateMain(folderName);
          const fileTasks = [
            {
              path: path.join(
                coreChildrenFolder.lang,
                `${folderName}_localizations.dart`
              ),
              writer: coreTemplate.localizations,
            },
            {
              path: path.join(
                coreChildrenFolder.lang,
                `${folderName}_translations.dart`
              ),
              writer: coreTemplate.translations,
            },
            {
              path: path.join(
                coreChildrenFolder.routers,
                `${folderName}_pages.dart`
              ),
              writer: coreTemplate.pages,
            },
            {
              path: path.join(
                coreChildrenFolder.routers,
                `${folderName}_routes.dart`
              ),
              writer: coreTemplate.routes,
            },
            {
              path: path.join(
                coreChildrenFolder.themes,
                `${folderName}_styles.dart`
              ),
              writer: coreTemplate.styles,
            },
            {
              path: path.join(
                coreChildrenFolder.themes,
                `${folderName}_themes.dart`
              ),
              writer: coreTemplate.themes,
            },
            {
              path: path.join(mainFolder.core, `${folderName}_bindings.dart`),
              writer: coreTemplate.bindings,
            },
            {
              path: path.join(
                dataChildrenFolder.data_sources,
                `demo_data_source.dart`
              ),
              writer: moduleTemplate.dataSource,
            },
            {
              path: path.join(dataChildrenFolder.models, `demo_model.dart`),
              writer: moduleTemplate.model,
            },
            {
              path: path.join(
                dataChildrenFolder.repositories,
                `demo_data_source.dart`
              ),
              writer: moduleTemplate.repository,
            },
            {
              path: path.join(
                presentationChildrenFolder.bindings,
                `demo_binding.dart`
              ),
              writer: moduleTemplate.binding,
            },
            {
              path: path.join(
                presentationChildrenFolder.controllers,
                `demo_controller.dart`
              ),
              writer: moduleTemplate.controller,
            },
            {
              path: path.join(
                presentationChildrenFolder.pages,
                `demo_page.dart`
              ),
              writer: moduleTemplate.demo,
            },
            {
              path: path.join(
                presentationChildrenFolder.pages,
                `home_page.dart`
              ),
              writer: moduleTemplate.home,
            },
            {
              path: path.join(
                presentationChildrenFolder.pages,
                `about_page.dart`
              ),
              writer: moduleTemplate.about,
            },
            {
              path: path.join(
                presentationChildrenFolder.widgets,
                `demo_widget.dart`
              ),
              writer: moduleTemplate.widget,
            },
            {
              path: path.join(pathLibFolder, "main.dart"),
              writer: mainTemplate.main,
            },
          ];
          await Promise.all(
            folderTasks.map(async (task) => {
              progress.report({
                message: `Creating template folder`,
              });
              await fs.ensureDir(task);
            })
          );

          await Promise.all(
            fileTasks.map(async (task) => {
              progress.report({
                message: `Creating template file`,
              });
              await fs.outputFile(task["path"], task["writer"]);
            })
          );

          progress.report({ message: "Running Pubspec" });
          await execPromise(
            `cd ${userDirectory} && code . --reuse-window && flutter pub get --no-example`
          ).catch(reject);

          vscode.window.showInformationMessage(
            "Template successfully created, enjoy using it! ✌️😊"
          );

          resolve();
        } catch (error) {
          vscode.window.showErrorMessage(
            `"Operation failed due to an issue, please try again | ${error}`
          );
          reject(error);
        }
      });
    }
  );
}
