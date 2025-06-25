// Bài tập 1: Calculator component - Phiên bản đơn giản (không CSS)
// TODO: Viết component Calculator nhận props: number1, number2, operation
// Operations: "add", "subtract", "multiply", "divide"
// Component phải pure và trả về kết quả tính toán

// Ví dụ sử dụng:
// <Calculator number1={10} number2={5} operation="add" />
// Kết quả: "10 + 5 = 15"

function Calculator({ number1, number2, operation }) {
    // Bước 1: Tính toán kết quả dựa trên operation
    let result;
    let symbol;

    switch (operation) {
        case "add":
            result = number1 + number2;
            symbol = "+";
            break;
        case "subtract":
            result = number1 - number2;
            symbol = "-";
            break;
        case "multiply":
            result = number1 * number2;
            symbol = "*";
            break;
        case "divide":
            result = number2 !== 0 ? number1 / number2 : "Error: Cannot divide by zero";
            symbol = "/";
            break;
        default:
            result = "Invalid operation";
            symbol = "?";
    }

    // Bước 2: Return JSX đơn giản
    return (
        <div>
            {number1} {symbol} {number2} = {result}
        </div>
    );
}

export default function CalculatorApp() {
    return (
        <div>
            <h1>Calculator Examples</h1>

            <h2>Basic Operations:</h2>
            <Calculator number1={10} number2={5} operation="add" />
            <Calculator number1={10} number2={5} operation="subtract" />
            <Calculator number1={10} number2={5} operation="multiply" />
            <Calculator number1={10} number2={5} operation="divide" />

            <h2>Edge Cases:</h2>
            <Calculator number1={10} number2={0} operation="divide" />
            <Calculator number1={15} number2={3} operation="invalid" />
            <Calculator number1={-5} number2={3} operation="add" />
            <Calculator number1={100} number2={25} operation="divide" />

            <h2>More Examples:</h2>
            <Calculator number1={7} number2={8} operation="multiply" />
            <Calculator number1={50} number2={25} operation="subtract" />
            <Calculator number1={99} number2={9} operation="divide" />
            <Calculator number1={12} number2={13} operation="add" />
        </div>
    );
}

