/**
 * HUOKAING THARA - Asset & Ledger Engine
 * Handles financial distribution metrics and real-time inflow logs.
 */

(() => {
    "use strict";

    // 1. Data Store
    const ASSET_CLASSES = [
        { name: "Corporate Operating Escrow", amount: "$108,200,000", percentage: 42.7 },
        { name: "Retail & High-Net-Worth Savings", amount: "$74,510,000", percentage: 29.4 },
        { name: "Interbank Overnight Placements", amount: "$45,200,000", percentage: 17.8 },
        { name: "Central Bank Term Deposits", amount: "$25,000,000", percentage: 9.8 }
    ];

    let recentInflows = [
        { id: "DEP-LN-9901", tier: "Corporate Wholesale", route: "Bakong Network Sweep", volume: "$4,500,000.00", status: "Success" },
        { id: "DEP-LN-9905", tier: "Corporate Wholesale", route: "Real-time Gross Settlement", volume: "$3,150,000.00", status: "Success" }
    ];

    // 2. Rendering Logic
    const LedgerEngine = {
        renderAssets: () => {
            const container = document.getElementById("distributionContainer");
            if (!container) return;
            container.innerHTML = ASSET_CLASSES.map(item => `
                <div class="tier-item">
                    <div class="tier-info">
                        <span class="tier-name">${item.name}</span>
                        <span class="tier-value">${item.amount} (${item.percentage}%)</span>
                    </div>
                    <div class="tier-track"><div class="tier-fill" style="width: ${item.percentage}%;"></div></div>
                </div>
            `).join("");
        },

        renderLedger: () => {
            const tbody = document.getElementById("depositLogBody");
            if (!tbody) return;
            tbody.innerHTML = recentInflows.map(log => `
                <tr>
                    <td style="font-weight: 600; color: #38bdf8;">${log.id}</td>
                    <td>${log.tier}</td>
                    <td style="color: #94a3b8;">${log.route}</td>
                    <td style="font-weight: 600; color: #fff;">${log.volume}</td>
                    <td><span class="badge ${log.status.toLowerCase()}">${log.status}</span></td>
                </tr>
            `).join("");
        },

        // New function to integrate with "Add Vault"
        addEntry: (newEntry) => {
            recentInflows.unshift(newEntry); // Add to start of array
            LedgerEngine.renderLedger();    // Re-render table
        }
    };

    // 3. Initialization
    document.addEventListener("DOMContentLoaded", () => {
        LedgerEngine.renderAssets();
        LedgerEngine.renderLedger();
    });

    // Expose to global scope for the "Add Vault" button
    window.LedgerEngine = LedgerEngine;
})();
        
