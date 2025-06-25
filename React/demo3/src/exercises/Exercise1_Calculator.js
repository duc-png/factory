// Bài tập 1: Tạo Calculator component
// TODO: Viết component Calculator nhận props: number1, number2, operation
// Operations: "add", "subtract", "multiply", "divide"
// Component phải pure và trả về kết quả tính toán

// Ví dụ sử dụng:
// <Calculator number1={10} number2={5} operation="add" />
// Kết quả: "10 + 5 = 15"

import './Exercise1_Calculator.css';

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

    // Bước 2: Xác định CSS class dựa trên operation và result
    let cssClass = `calculator-result ${operation}`;

    if (typeof result === 'string' && result.includes('Error')) {
        cssClass += ' error';
    } else if (typeof result === 'string' && result.includes('Invalid')) {
        cssClass += ' invalid';
    }

    return (
        <div className={cssClass}>
            {number1} {symbol} {number2} = {result}
        </div>
    );
}

export default function CalculatorApp() {
    return (
        <div className="calculator-container">
            <h1>🧮 Calculator Examples</h1>

            <div className="operations-section">
                <h2>📊 Basic Operations</h2>
                <div className="operations-grid">
                    <Calculator number1={10} number2={5} operation="add" />
                    <Calculator number1={10} number2={5} operation="subtract" />
                    <Calculator number1={10} number2={5} operation="multiply" />
                    <Calculator number1={10} number2={5} operation="divide" />
                </div>
            </div>

            <div className="operations-section">
                <h2>⚠️ Edge Cases</h2>
                <div className="operations-grid">
                    <Calculator number1={10} number2={0} operation="divide" />
                    <Calculator number1={15} number2={3} operation="invalid" />
                    <Calculator number1={-5} number2={3} operation="add" />
                    <Calculator number1={100} number2={25} operation="divide" />
                </div>
            </div>

            <div className="operations-section">
                <h2>🎯 More Examples</h2>
                <div className="operations-grid">
                    <Calculator number1={7} number2={8} operation="multiply" />
                    <Calculator number1={50} number2={25} operation="subtract" />
                    <Calculator number1={99} number2={9} operation="divide" />
                    <Calculator number1={12} number2={13} operation="add" />
                </div>
            </div>
        </div>
    );
}
