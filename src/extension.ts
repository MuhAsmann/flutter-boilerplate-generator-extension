import * as vscode from "vscode";
import { createTemplate } from "./commands/create-template";

export function activate(context: vscode.ExtensionContext) {
  const disposable = createTemplate();
  require('dotenv').config({path: __dirname + '/../.env'});

  context.subscriptions.push(disposable);
}
export function deactivate() { }
