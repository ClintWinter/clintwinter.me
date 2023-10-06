import { DateTime } from "luxon";

const guessDateFormat = (date: string) => {
    const formats = ['fromSQL', 'fromISO'];

    for (const format of formats) {
        const parsed = DateTime[format](date, { zone: "America/New_York" });

        if (parsed.isValid) {
            return parsed;
        }
    }

    return undefined;
};

export { guessDateFormat };
