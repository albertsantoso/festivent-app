import "./DefaultButton.css";

export default function PrimaryButton({
    buttonText,
    bgColor,
    textColor,
    width,
    handleFunction,
}) {
    return (
        <>
            <div className="PrimaryButton">
                <button
                    onClick={handleFunction}
                    className={`rounded-lg px-[12px] py-[8px] w-${width} duration-200 min-w-max ${bgColor} text-${textColor}`}
                >
                    {buttonText}
                </button>
            </div>
        </>
    );
}
