export default function Card( {title, flyerurl, date, time, building, room, description }) {
    
    <>

    <img src={flyerurl} />
    <div class="absolute border border-lg grid grid-rows-2 grid-cols-2">
        <h2>{date}</h2>
        <h2>{title}</h2>
        <h2>{building} {room}</h2>
        <h2>{time}</h2>
    </div>
    <div>
        <h3>{description}</h3>
    </div>
    </>
    
}