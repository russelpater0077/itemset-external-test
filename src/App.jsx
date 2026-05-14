function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-plugin-src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.pluginSrc = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

const BUNDLE_URL =
  "https://61665fa6e0stg.blob.core.windows.net/itemset-wizard/embedded-itemset-library.js?sp=r&st=2026-05-14T21:56:14Z&se=2026-06-19T06:11:14Z&sv=2025-11-05&sr=b&sig=853ldTrk%2FmegZkr3pVoLxPveyCEz0EMkNDJ3i385nk8%3D";

const SERVER_API_PATH = "/asset-library/api";
const proxyHost = import.meta.env.VITE_PROXY_HOST;

export default function App() {
  async function handleCreateItemset() {
    try {
      await loadScript(BUNDLE_URL);

      if (!window.configureApiEndpoints || !window.renderItemsetWizard) {
        throw new Error("Itemset bundle loaded, but expected globals were not found");
      }

      window.configureApiEndpoints({
        proxyHost: proxyHost || "https://advertising.pqa.walmart.com",
        serverUrl: SERVER_API_PATH,
      });

      window.renderItemsetWizard({
        containerId: "itemset-plugin-root",
        disableRouting: true,
        renderAsModal: true,
        isOpen: true,
        userEmail: "test@example.com",
        requestOptions: {
          advertiser: { id: "123" },
        },
        onSubmit: (data) => {
          console.log("Itemset created:", data);
          alert("Itemset created successfully");
        },
        onCancel: () => {
          console.log("Itemset creation cancelled");
        },
        onSuccessClose: () => {
          console.log("Success modal closed");
        },
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  function handleCreateAudience() {
    alert("Audience test button");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f8fa",
        fontFamily: "Arial, sans-serif",
        padding: 40,
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 32 }}>Ad Platform Test Website</h1>
        <p style={{ color: "#475467", marginTop: 12, marginBottom: 32 }}>
          This is a test website for creating audiences and itemsets.
        </p>

        <div style={{ display: "flex", gap: 16 }}>
          <button
            onClick={handleCreateAudience}
            style={{
              padding: "12px 20px",
              borderRadius: 999,
              border: "1px solid #d0d5dd",
              background: "#fff",
              cursor: "pointer",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Create Audience
          </button>

          <button
            onClick={handleCreateItemset}
            style={{
              padding: "12px 20px",
              borderRadius: 999,
              border: "none",
              background: "#0071dc",
              color: "#fff",
              cursor: "pointer",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            Create Itemset
          </button>
        </div>

        <div
          id="itemset-plugin-root"
          style={{
            marginTop: 32,
            minHeight: 300,
            border: "1px dashed #cbd5e1",
            borderRadius: 12,
            padding: 20,
            color: "#667085",
            background: "#fafbfc",
          }}
        >
          Itemset plugin mount area
        </div>
      </div>
    </main>
  );
}
