export const TARIFFS = {
    halfDay: {
        label: "Halbtags-Miete (12h)",
        durationHours: 12,
        price: 88,
        description: "12 Std. Deine Zeitwahl.",
        includedKm: 100
    },
    fullDay: {
        label: "Ganztags-Miete (24h)",
        durationHours: 24,
        price: 169,
        description: "24 Std. Deine Zeitwahl.",
        includedKm: 200
    },
    weekend: {
        label: "Wochenend-Tarif (48h)",
        durationHours: 48,
        price: 290,
        description: "48 Std. Frei wählbar (z.B. Fr-So).",
        includedKm: 400
    },
    weekly: {
        label: "Wochen-Tarif (7 Tage)",
        durationHours: 7 * 24,
        price: 999,
        description: "7 Tage mieten, flexibel zurückgeben.",
        includedKm: 1000
    },
} as const;

export type TariffType = keyof typeof TARIFFS;

// Helper to get simple price map for backend
export const TARIFF_PRICES: Record<string, number> = {
    halfDay: TARIFFS.halfDay.price,
    fullDay: TARIFFS.fullDay.price,
    weekend: TARIFFS.weekend.price,
    weekly: TARIFFS.weekly.price,
};
