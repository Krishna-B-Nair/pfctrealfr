function calculate() {
  const V = parseFloat(document.getElementById("voltage").value);
  const f = 50; // Frequency in Hz
  const n = parseInt(document.getElementById("numLoads").value);
  const requiredPF = parseFloat(document.getElementById("requiredPF").value);

  let totalP = 0;
  let totalQ = 0;

  for (let i = 0; i < n; i++) {
    const P = parseFloat(document.getElementById(`P${i}`).value);
    const PF = parseFloat(document.getElementById(`PF${i}`).value);
    const Q = P * Math.tan(Math.acos(PF)); // Reactive power in kVAR
    totalP += P;
    totalQ += Q;
  }

  const presentPF = totalP / Math.sqrt(totalP ** 2 + totalQ ** 2);
  const targetQ = totalP * Math.tan(Math.acos(requiredPF));
  const Qc = totalQ - targetQ; // Required capacitive reactive power in kVAR

  const C = (Qc * 1000) / (2 * Math.PI * f * V * V); // Capacitance in Farads
  const C_micro = C * 1e6; // Convert to µF

  document.getElementById("results").innerText =
    `Total Reactive Power without Capacitor: ${totalQ.toFixed(2)} kVAR\n` +
    `Present Power Factor: ${presentPF.toFixed(3)}\n` +
    `Required Capacitive Reactive Power: ${Qc.toFixed(2)} kVAR\n` +
    `Capacitance Required: ${C_micro.toFixed(2)} µF`;
}
