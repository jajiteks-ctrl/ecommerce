import red from "../image/red.jpg"
import "./About.css"


const About = () => {

    const headingStyles = {
        color: "green",
        fontSize: "45px",
        fontWeight: "bold"

    }


    return (
        <div className="bg-container">
            <h1 style={headingStyles}>Hello about component</h1>

            <h1 style = {{color : "red",fontWeight: "bold"}}>hello inline styles</h1>

            <img src = {red} className = "rose-img" alt = ""/>
        </div>
    )
}

export default About
