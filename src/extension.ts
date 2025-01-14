import * as vscode from "vscode";
import { createTemplate } from "./commands/create-template";
import { generatePattern } from "./commands/generate-pattern";

export function activate(context: vscode.ExtensionContext) {
  const createTemplateCommand = createTemplate();
  const generatePatternCommand = generatePattern();
  require("dotenv").config({ path: __dirname + "/../.env" });

  context.subscriptions.push(createTemplateCommand);
  context.subscriptions.push(generatePatternCommand);
}
export function deactivate() {}
