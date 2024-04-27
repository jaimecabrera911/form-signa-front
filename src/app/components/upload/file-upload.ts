export class FileUpload{

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    onRemove(event: any, files: any) {
        console.log(event);
        files.splice(files.indexOf(event), 1);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    onSelect(event, files) {
        if (files.length <= 0) {
            files.push(...event.addedFiles);
        } else {
            return;
        }
    }
}
