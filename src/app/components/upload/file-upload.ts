export class FileUpload{

    onRemove(event, files) {
        console.log(event);
        files.splice(files.indexOf(event), 1);
    }

    onSelect(event, files) {
        if (files.length <= 0) {
            files.push(...event.addedFiles);
        } else {
            return;
        }
    }
}
