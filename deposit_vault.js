/**
 * HUOKAING THARA - Audit Vault Module
 * Manages the manual injection of new deposit records into the system ledger.
 */

(() => {
    "use strict";

    const AuditVault = {
        /**
         * Adds a new placement to the Audit Vault table.
         * @param {string} refId - The unique transaction ID.
         * @param {string} tier - The account tier (e.g., Institutional).
         * @param {string} route - The routing method.
         * @param {string} amount - The raw amount string.
         */
        addPlacement: function(refId, tier, route, amount) {
            // 1. Sanitize the amount
            const cleanAmount = `$${parseFloat(amount).toLocaleString(undefined, {minimumFractionDigits: 2})}`;

            // 2. Construct the entry object
            const newEntry = {
                id: refId,
                tier: tier,
                route: route,
                volume: cleanAmount,
                status: "Success"
            };

            // 3. Push to the Ledger Engine
            if (window.LedgerEngine) {
                window.LedgerEngine.addEntry(newEntry);
                console.log(`[AUDIT VAULT]: Record ${refId} pushed to Ledger.`);
            } else {
                console.error("[AUDIT VAULT]: LedgerEngine not initialized.");
            }
        }
    };

    // Expose to window for easy calling from your HTML buttons
    window.addVaultRecord = AuditVault.addPlacement;
})();

