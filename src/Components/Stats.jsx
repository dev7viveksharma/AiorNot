import CircularLoader from './Loaders/CircularLoader';
import '../Style/stats.css';
export default function Stats({value , topic , isLoading}){
    return(
        <>
        <div className="stats-box">
            { isLoading ? (
                <CircularLoader/>
            ):(
            <>
                <h1>{value}+</h1>
                <p>{topic}</p>
            </>
            )}
        </div>
        </>
    )
}