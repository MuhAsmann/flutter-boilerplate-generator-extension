import { exec } from "child_process";

export const execPromise = (command: string) => {
  return new Promise<void>((resolve, reject) => {
    exec(command, (error, _, __) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
