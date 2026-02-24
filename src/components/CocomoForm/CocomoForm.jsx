import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
    TextField,
    Select,
    MenuItem,
} from "@mui/material";

import { FormField } from "../../components";

import { MODEL_TABLE } from "../../constants/modelTable";

export const CocomoForm = () => {
    const [result, setResult] = useState(null);

    const {
        register,
        watch,
        formState: { errors }
    } = useForm({
        mode: "onChange",
        defaultValues: {
            projectType: "organic",
            codeSize: ""
        }
    });

    const codeSize = watch("codeSize");
    const projectType = watch("projectType");

    useEffect(() => {
        if (!codeSize) {
            setResult(null);
            return;
        }

        const size = Number(codeSize);

        if (Number.isNaN(size) || size <= 0) return;

        const model = MODEL_TABLE[projectType];

        if (!model) return;

        const [a, b, c, d] = model;

        const effort = a * Math.pow(size, b);
        const time = c * Math.pow(effort, d);
        const persons = effort / time;

        setResult({
            effort: effort.toFixed(2),
            time: time.toFixed(2),
            persons: persons.toFixed(1),
        });
    }, [codeSize, projectType]);

    return (
        <div className="cocomo-form">
            <div className="cocomo-form__container">

                <FormField
                    label="Тип проєкту"
                >
                    <Select
                        {...register("projectType")}
                        value={projectType}
                    >
                        <MenuItem value="organic">Органічний</MenuItem>
                        <MenuItem value="semiDetached">Напівнезалежний</MenuItem>
                        <MenuItem value="embedded">Вбудований</MenuItem>
                    </Select>
                </FormField>


                <FormField
                    label=" Кількість рядків коду (тисяч)"
                    errorMessage={errors.codeSize?.message}
                >
                    <TextField
                        type="number"
                        inputProps={{ min: 1 }}
                        {...register("codeSize", {
                            required: "Введіть кількість рядків коду!",
                            min: {
                                value: 1,
                                message: "Кількість рядків коду має бути більшим за 0!"
                            }
                        })}
                        error={!!errors.codeSize}
                    />
                </FormField>

                {result && (
                    <div className="cocomo-form__result">
                        <span>
                            <strong>Трудомісткість:</strong> <em>{result.effort} людино-місяців</em>
                        </span>
                        <span>
                            <strong>Тривалість:</strong> <em>{result.time} місяців</em>
                        </span>
                        <span>
                            <strong>Розробників:</strong> <em>{result.persons} осіб</em>
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}