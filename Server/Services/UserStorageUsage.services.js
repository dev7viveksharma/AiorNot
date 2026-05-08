function formatSize(bytes) {
    let formatdetails = {
        size : bytes,
        sizeformat : null
    }
    if (bytes < 1024) return formatdetails = {
    size : bytes,
    sizeformat : "B"
    };
    else if (bytes < 1024 * 1024) return formatdetails = {
    size : (bytes/1024).toFixed(2),
    sizeformat : "KB"
    };
    else if (bytes < 1024 * 1024 * 1024) return formatdetails = {
    size : (bytes / (1024 * 1024)).toFixed(2),
    sizeformat : "MB"
    };
    else return formatdetails = {
    size : (bytes / (1024 * 1024 * 1024)).toFixed(2),
    sizeformat : "GB"
    };
}




export const Usage = async(sizeinbytes)=>{
    const getformatdetails = formatSize(sizeinbytes);
    return getformatdetails;
}