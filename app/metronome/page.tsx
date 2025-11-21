import Metronome from "../ui/metronome/metronome"
import Nav from "../ui/nav";

export default function Page() {
    return (
        <div className="flex flex-col">
            <Nav />
            <Metronome />
        </div>
    )
}