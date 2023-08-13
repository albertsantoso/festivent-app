import "./DefaultButton.css";

export default function PrimaryButton({
    buttonText,
    bgColor,
    textColor,
    handleFunction,
    customStyle,
    textSize = "sm"
}) {
    return (
        <>
            <div className="PrimaryButton w-full">
                <button
                    onClick={handleFunction}
                    className={`rounded-lg md:px-[12px] h-[42px] w-full text-sm md:text-${textSize} duration-150 ${bgColor} text-${textColor} ${customStyle}`}
                >{buttonText}</button>
            </div>
        </>
    );
}
