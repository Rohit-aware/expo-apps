import { TurboModule, TurboModuleRegistry } from 'react-native';
interface WidgetModule extends TurboModule {
    setWidgetText(text: string): void;
}

const WidgetModule = TurboModuleRegistry.getEnforcing<WidgetModule>('WidgetModule');
export default WidgetModule;
