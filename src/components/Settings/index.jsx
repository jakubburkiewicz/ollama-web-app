import { useSettings } from "../../contexts/SettingsContext"

const Settings = () => {
    const { settings, settingsDispatch } = useSettings()

    const handleHostChange = event => {
        settingsDispatch( {
            type: 'setHost',
            host: event.target.value
        } )
    }

    return (
        <section className="flex flex-col grow h-full gap-4 p-4">
            <label className="flex flex-col gap-2">
                <span className="text-sm">Host</span>

                <input
                    className="p-2 rounded border border-gray-300 h-10"
                    type="text"
                    value={ settings.host }
                    onChange={ handleHostChange }
                />
            </label>
        </section>
    )
}

export default Settings