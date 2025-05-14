import { useState } from "react";
import { useTheme } from "../hooks/useTheme"; // Asegúrate de importar tu hook de tema
import { useClerk } from "@clerk/clerk-react"; // Si usas Clerk para autenticación

export default function SettingsPage() {
    const { theme, toggleTheme } = useTheme();
    const { user, signOut } = useClerk();

    // Gestión de perfil
    const [profile, setProfile] = useState({
        name: user?.firstName || "",
        email: user?.emailAddresses[0]?.emailAddress || "",
    });

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = () => {
        // Aquí puedes agregar lógica para guardar el perfil (llamar a Clerk API o tu API personalizada)
        alert("Perfil actualizado!");
    };

    // Cambiar contraseña (simulación)
    const [password, setPassword] = useState({ current: "", new: "", confirm: "" });
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPassword((prev) => ({ ...prev, [name]: value }));
    };

    const handleSavePassword = () => {
        if (password.new !== password.confirm) {
            alert("Las contraseñas no coinciden.");
        } else {
            // Lógica para cambiar la contraseña
            alert("Contraseña actualizada!");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Configuración de Cuenta</h1>

            {/* Perfil */}
            <div className="space-y-4 mb-8">
                <h2 className="text-xl font-semibold">Perfil</h2>
                <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="p-2 w-full bg-gray-800 text-white rounded-md"
                    placeholder="Nombre"
                />
                <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="p-2 w-full bg-gray-800 text-white rounded-md"
                    placeholder="Correo electrónico"
                />
                <button
                    onClick={handleSaveProfile}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
                >
                    Guardar perfil
                </button>
            </div>

            {/* Cambiar contraseña */}
            <div className="space-y-4 mb-8">
                <h2 className="text-xl font-semibold">Cambiar Contraseña</h2>
                <input
                    type="password"
                    name="current"
                    value={password.current}
                    onChange={handlePasswordChange}
                    className="p-2 w-full bg-gray-800 text-white rounded-md"
                    placeholder="Contraseña actual"
                />
                <input
                    type="password"
                    name="new"
                    value={password.new}
                    onChange={handlePasswordChange}
                    className="p-2 w-full bg-gray-800 text-white rounded-md"
                    placeholder="Nueva contraseña"
                />
                <input
                    type="password"
                    name="confirm"
                    value={password.confirm}
                    onChange={handlePasswordChange}
                    className="p-2 w-full bg-gray-800 text-white rounded-md"
                    placeholder="Confirmar nueva contraseña"
                />
                <button
                    onClick={handleSavePassword}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
                >
                    Cambiar Contraseña
                </button>
            </div>

            {/* Preferencias de Personalización */}
            <div className="space-y-4 mb-8">
                <h2 className="text-xl font-semibold">Preferencias de Personalización</h2>
                <div className="flex items-center gap-4">
                    <span>Modo {theme === "light" ? "Claro" : "Oscuro"}</span>
                    <button
                        onClick={toggleTheme}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
                    >
                        Cambiar Tema
                    </button>
                </div>
            </div>

            {/* Cerrar sesión */}
            <div className="mt-6">
                <button
                    onClick={() => signOut()}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}
