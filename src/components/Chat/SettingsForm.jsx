import { useSettings } from "../../contexts/SettingsContext"

const ChatSettingsForm = () => {
    const { settings, settingsDispatch } = useSettings()

    const handleModelChange = event => {
        settingsDispatch( {
            type: 'setModel',
            model: settings.modelOptions.find( model => model.name === event.target.value )
        } )
    }

    return (
        <div className="flex gap-4">
            <label className="flex flex-col gap-2">
                <span className="text-sm">Model</span>

                <select
                    className="p-2 rounded border border-gray-300 w-48 h-10"
                    value={ settings.model.name }
                    onChange={ handleModelChange }
                >
                    {
                        settings?.modelOptions?.map( model => (
                            <option
                                key={ model.digest }
                                value={ model.name }
                            >{ model.name }</option>
                        ) )
                    }
                </select>
            </label>
        </div>
    )
}

export default ChatSettingsForm