import * as vscode from "vscode";

export const getWorkspace = () => {
  const currentWorkspace = vscode.workspace.workspaceFolders;
  if (!currentWorkspace) {
    vscode.window.showErrorMessage("Tidak ada workspace terbuka");
    return;
  }
  const workspace = currentWorkspace[0].uri.path.split("/");
  return workspace[workspace.length - 1];
};
