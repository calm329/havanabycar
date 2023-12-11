import { showSuccess } from "./feedbacks.js";

const copyText = () => {
    var textToCopy = document.querySelector("#dynamicLink").innerText;

    // Create a textarea element and set its value to the text
    var textarea = document.createElement("textarea");
    textarea.value = textToCopy;

    // Append the textarea element to the document
    document.body.appendChild(textarea);

    // Select the text inside the textarea
    textarea.select();

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the temporary textarea element
    document.body.removeChild(textarea);

    // Optionally, you can provide a user feedback message
    //alert("Text has been copied to clipboard: " + textToCopy);
};

export default copyText;