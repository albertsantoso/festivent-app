import "./DefaultButton.css"

export default function PrimaryButton({ buttonText, textColor, bgColor, width }) {
    return (
        <>
            <div className="PrimaryButton">
                <button
                    className={`rounded-lg px-[12px] py-[8px] w-${width} duration-200 min-w-max ${bgColor} text-${textColor}`}>
                    {buttonText}
                </button>
            </div >
        </>
    )
}