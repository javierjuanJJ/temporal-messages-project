import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const completed = localStorage.getItem("onboardingCompleted");
        if (completed) {
            navigate("/home"); // Redirige si el tutorial ya fue completado
        }
    }, [navigate]);

    const handleNextStep = () => {
        setStep((prev) => prev + 1);
    };

    const handleSkip = () => {
        localStorage.setItem("onboardingCompleted", "true");
        navigate("/home");
    };

    const handleFinish = () => {
        localStorage.setItem("onboardingCompleted", "true");
        navigate("/home");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-semibold mb-4">Bienvenido a MicroPaste</h2>

                {step === 1 && (
                    <div>
                        <p className="mb-4">¡Hola! Este es un lugar donde puedes crear mensajes temporales y privados.</p>
                        <button
                            onClick={handleNextStep}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                        >
                            Siguiente
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <p className="mb-4">Puedes elegir entre un modo claro u oscuro para personalizar tu experiencia.</p>
                        <button
                            onClick={handleNextStep}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                        >
                            Siguiente
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <p className="mb-4">Tus mensajes se autodestruyen después de ser leídos o después de un tiempo.</p>
                        <button
                            onClick={handleFinish}
                            className="bg-green-600 text-white px-4 py-2 rounded-md"
                        >
                            Empezar
                        </button>
                    </div>
                )}

                <div className="flex justify-between mt-4">
                    <button onClick={handleSkip} className="text-gray-500">Saltar</button>
                    <button onClick={handleFinish} className="text-gray-500">Cerrar</button>
                </div>
            </div>
        </div>
    );
}
