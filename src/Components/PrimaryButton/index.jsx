import "./DefaultButton.css";

export default function PrimaryButton({
    buttonText,
    bgColor,
    textColor,
    width,
    handleFunction,
    customStyle
}) {
    return (
        <>
            <div className="PrimaryButton">
                <button
                    onClick={handleFunction}
                    className={`rounded-lg px-[12px] py-[8px] w-${width} duration-150 ${bgColor} text-${textColor} ${customStyle}`}
                >
                    {buttonText}
                </button>
            </div>
        </>
    );
}
