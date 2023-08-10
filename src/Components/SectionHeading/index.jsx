export default function SectionHeading(props) {
    return (
        <>
            <div className="section-heading flex justify-start mb-6">
                <h2 className="section-title font-bold text-2xl"> {props.sectionTitle} </h2>
            </div>
        </>
    )
}