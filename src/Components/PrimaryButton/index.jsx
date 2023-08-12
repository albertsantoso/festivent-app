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
                    className={`rounded-lg px-[12px] h-[44px] w-${width} duration-150 ${bgColor} text-${textColor} ${customStyle} active:bg-neutral-100`}
                >
                    {buttonText}
                </button>
            </div>
        </>
    );
}
