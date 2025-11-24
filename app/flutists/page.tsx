import FlutistsGrid from '../ui/flutists/flutists-grid';
import Nav from '../ui/nav';

export default function Page() {
    return (
        <div className="flex flex-col">
            <Nav />
            <FlutistsGrid />
        </div>
    )
}