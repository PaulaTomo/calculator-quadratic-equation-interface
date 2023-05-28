import React, {useState} from 'react';


const Calculator = () => {
    const [a, setA] = useState('1');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    const [result, setResult] = useState(null);


    const calculateEquation = () => {
        const equationRequest = {
            a: parseFloat(a),
            b: parseFloat(b),
            c: parseFloat(c)
        };

        fetch('http://localhost:5000/quadratic-equation', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(equationRequest)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error calculating equation');
                }
            })
            .then(data => {
                setResult(data);
            })
            .catch(error => {
                setResult(null)
                console.error('Error', error);
            });
    };

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h2>Quadratic Equation Calculator</h2>
                <p className="text-muted">b ^ 2 - 4 * a * c</p>
                <div className="row">
                    <div className="col">
                        <label htmlFor="aInput ">a:</label>
                        <input
                            type="number"
                            id="aInput"
                            className="form-control "
                            value={a}
                            onChange={(e) => setA(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="bInput">b:</label>
                        <input
                            type="number"
                            id="bInput"
                            className="form-control"
                            value={b}
                            onChange={(e) => setB(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="cInput">c:</label>
                        <input
                            type="number"
                            id="cInput"
                            className="form-control"
                            value={c}
                            onChange={(e) => setC(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <button className="btn btn-primary" onClick={calculateEquation}>
                            Calculate
                        </button>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        {result !== null ? (
                            <div className="alert alert-info fw-semibold"> Result:<br/>
                                x1 = {result.x1},<br/>
                                x2 = {result.x2}
                            </div>
                        ) : (
                            <div className="alert alert-info text-danger">No real roots!</div>
                        )}

                    </div>
                </div>
            </div>


        </div>
    );
};

export default Calculator;
