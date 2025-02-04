//% color="#ED755E"
namespace Fuzzy_sensor {


    export enum DHT11Type {
        //% block="temperature(℃)" enumval=0
        DHT11_temperature_C,

        //% block="humidity(0~100)" enumval=1
        DHT11_humidity,
    }

    //% blockId=mbit_ultrasonic block="Distancia do sensor ultrasonico (cm) "
    //% weight=98
    //% blockGap=10

    export function Ultrasonic(): number {

        // send pulse
        pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P14, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P14, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P14, 0);

        // read pulse
        let d = pins.pulseIn(DigitalPin.P15, PulseValue.High, 23200);
        return Math.floor((d + 112) / 56);
    }


    /**
         * get dht11 temperature and humidity Value
         * @param dht11pin describe parameter here, eg: DigitalPin.P15     */
    //% blockId="readdht11" block="Valor do sensor de temeperatura e umidade %dht11type| no pino %dht11pin"
    //% weight=98
    //% blockGap=10


    export function dht11value(dht11type: DHT11Type, dht11pin: DigitalPin): number {

        pins.digitalWritePin(dht11pin, 0)
        basic.pause(18)
        let i = pins.digitalReadPin(dht11pin)
        pins.setPull(dht11pin, PinPullMode.PullUp);
        switch (dht11type) {
            case 0:
                let dhtvalue1 = 0;
                let dhtcounter1 = 0;
                while (pins.digitalReadPin(dht11pin) == 1);
                while (pins.digitalReadPin(dht11pin) == 0);
                while (pins.digitalReadPin(dht11pin) == 1);
                for (let i = 0; i <= 32 - 1; i++) {
                    while (pins.digitalReadPin(dht11pin) == 0);
                    dhtcounter1 = 0
                    while (pins.digitalReadPin(dht11pin) == 1) {
                        dhtcounter1 += 1;
                    }
                    if (i > 15) {
                        if (dhtcounter1 > 2) {
                            dhtvalue1 = dhtvalue1 + (1 << (31 - i));
                        }
                    }
                }
                return ((dhtvalue1 & 0x0000ff00) >> 8);
                break;
            case 1:
                while (pins.digitalReadPin(dht11pin) == 1);
                while (pins.digitalReadPin(dht11pin) == 0);
                while (pins.digitalReadPin(dht11pin) == 1);

                let value = 0;
                let counter = 0;

                for (let i = 0; i <= 8 - 1; i++) {
                    while (pins.digitalReadPin(dht11pin) == 0);
                    counter = 0
                    while (pins.digitalReadPin(dht11pin) == 1) {
                        counter += 1;
                    }
                    if (counter > 3) {
                        value = value + (1 << (7 - i));
                    }
                }
                return value;
            default:
                return 0;
        }
    }
    //% blockId="OLEDfuzzy" block="Inicia OLED com largura %larg| e altura %alt "
    //% weight=87
    export function IniciaOLED(alt: number, larg: number): void {


        OLED.init(64, 128)
    }

    //% blockId="MostrarString" block="Mostrar string %String "
    //% weight=87
    export function MostrarString(String: string): void {

        OLED.showStringWithNewLine(String)

    }
    //% blockId="Mostrarnumero" block=" Mostrar numero %Numero "
    //% weight=80
    export function Mostrarnumero(Numero: number): void {

        OLED.showNumberWithNewLine(Numero)

    }
    //% blockId="LimparTela" block=" Limpar a tela "
    //% weight=80
    export function LimpaTela(): void {

        OLED.clear()

    }

}