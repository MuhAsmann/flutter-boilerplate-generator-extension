import * as vscode from "vscode";
import { createTemplate } from "./commands/create-template";

export function activate(context: vscode.ExtensionContext) {
  const disposable = createTemplate();

  context.subscriptions.push(disposable);
}
export function deactivate() {}
