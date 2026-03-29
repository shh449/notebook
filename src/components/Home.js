
import Notes from './Notes';

export default function Home(props) {
    const { showalert } = props

    return (
        <div style={{ marginTop: "80px" }}>

            <Notes showalert={showalert} />
        </div>
    );
}
