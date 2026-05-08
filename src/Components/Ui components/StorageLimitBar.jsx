import "./StorageLimitBar.css";

export default function StorageLimitBar({total , totalformat , used , usedformat}){
    const bytecalculater = (format , value ) =>{
        switch(format){
            case "KB": return value * 1024;
            case "MB": return value * 1024 * 1024;
            case "GB": return value * 1024 * 1024 * 1024;
            default: return value;
        }
    }

    const totaltobyte = bytecalculater(totalformat , Number(total));
    const usedtobyte = bytecalculater(usedformat , Number(used));

    const percentage = totaltobyte > 0
        ? Math.min((usedtobyte / totaltobyte) * 100, 100)
        : 0;

    return(
       <div className="progress-container">
            <div className="progress">
                <div className="top-text">
                    <p>{Number(total)} {totalformat} <span>Total</span></p>
                    <p>{Number(used)} {usedformat} <span>Used</span></p>
                </div>

                <div className="progress-wrapper">
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
                </div>
                </div>
            </div>
        </div>
    )
}