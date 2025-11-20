import { Button } from "./Button";

export const PriceFilter = ({ min, max, onMinChange, onMaxChange }) => {
    const handleMin = (event) => {
        const value = event.target.value;
        if (value === "") {
            onMinChange(value);
            return;
        }
        const numeric = Number(value);
        if (isNaN(numeric) || numeric < 0) return;

        if (max !== "" && numeric > Number(max)) {
            onMinChange(max);
        } else {
            onMinChange(value);
        }
    };

    const handleMax = (event) => {
        const value = event.target.value;
        if (value === "") {
            onMaxChange("");
            return;
        }

        const numeric = Number(value);
        if (isNaN(numeric) || numeric < 0) return;

        if (min !== "" && numeric < Number(min)) {
            onMaxChange(min);
        } else {
            onMaxChange(value);
        }
    };

    const handleReset = () => {
        onMinChange("");
        onMaxChange("");
    };

    const hasValues = min !== "" || max !== "";

    return (
        <div className="perfect-center gap-2 items-start">
            <div className="flex gap-4">
                <div className="flex gap-3">
                    <label className="flex items-center gap-2">
                        <span>Desde:</span>
                        <input
                            type="number"
                            min="0"
                            value={min}
                            onChange={handleMin}
                            className="border rounded-lg px-3 py-1 w-24 text-center"
                        />
                    </label>
                    <label className="flex items-center gap-2">
                        <span>Hasta:</span>
                        <input
                            type="number"
                            min="0"
                            value={max}
                            onChange={handleMax}
                            className="border rounded-lg px-3 py-1 w-24 text-center"
                        />
                    </label>
                </div>
                <Button variant={hasValues ? "secondary" : "ghost"} onClick={handleReset}>
                    Limpiar
                </Button>
                {hasValues && (
                    <p className="text-sm text-gray-700">
                        Mostrando productos {min && `desde ${min} €`} {max && `hasta ${max} €`}
                    </p>
                )}
            </div>
        </div>
    );
};
