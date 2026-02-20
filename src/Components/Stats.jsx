import '../Style/stats.css';
export default function Stats({value , topic}){
    return(
        <>
        <div className="stats-box">
            <h1>{value}+</h1>
            <p>{topic}</p>
        </div>
        </>
    )
}