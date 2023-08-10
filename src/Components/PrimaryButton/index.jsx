import "./DefaultButton.css"

export default function PrimaryButton({ buttonText, bgColor, width }) {
    return (
        <>
            <div className="DefaultButton">
                <button
                    className={`rounded-lg px-[12px] py-[8px] w-${width} duration-200 min-w-max ${bgColor}`}>
                    {buttonText}
                </button>
            </div >
        </>
    )
}