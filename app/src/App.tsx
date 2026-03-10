import { useMemo, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createProgram, createProvider, getCounterPda } from "./solana";

type CounterData = {
    authority: string;
    count: number;
    bump: number;
};

const App = () => {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [counter, setCounter] = useState<CounterData | null>(null);
    const [status, setStatus] = useState("Wallet baglantisi bekleniyor.");
    const [loading, setLoading] = useState(false);

    const provider = useMemo(() => createProvider(connection, wallet), [connection, wallet]);
    const program = useMemo(() => (provider ? createProgram(provider) : null), [provider]);

    const refreshCounter = async () => {
        if (!wallet.publicKey || !program) return;
        const [counterPda] = getCounterPda(wallet.publicKey);
        const fetched = await (program.account as any).counter.fetchNullable(counterPda);
        if (!fetched) {
            setCounter(null);
            setStatus("Counter hesabi henuz olusturulmamis.");
            return;
        }

        setCounter({
            authority: fetched.authority.toBase58(),
            count: fetched.count.toNumber(),
            bump: fetched.bump
        });
        setStatus("Counter zincirden okundu.");
    };

    const initializeCounter = async () => {
        if (!wallet.publicKey || !program) return;
        setLoading(true);
        try {
            const [counterPda] = getCounterPda(wallet.publicKey);
            await program.methods
                .initialize()
                .accounts({
                    counter: counterPda,
                    authority: wallet.publicKey
                })
                .rpc();
            setStatus("Initialize islemi tamamlandi.");
            await refreshCounter();
        } catch (e) {
            setStatus(`Initialize hatasi: ${String(e)}`);
        } finally {
            setLoading(false);
        }
    };

    const incrementCounter = async () => {
        if (!wallet.publicKey || !program) return;
        setLoading(true);
        try {
            const [counterPda] = getCounterPda(wallet.publicKey);
            await program.methods
                .increment()
                .accounts({
                    counter: counterPda,
                    authority: wallet.publicKey
                })
                .rpc();
            setStatus("Increment islemi tamamlandi.");
            await refreshCounter();
        } catch (e) {
            setStatus(`Increment hatasi: ${String(e)}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <div className="mesh" />
            <main className="card">
                <h1>Counter PDA Lab</h1>
                <p className="sub">09-10 asamalarinin birlesik frontend baglanti + program etkilesimi</p>

                <div className="row">
                    <WalletMultiButton />
                    <button disabled={!wallet.connected || loading} onClick={refreshCounter}>
                        Fetch Counter
                    </button>
                </div>

                <div className="row">
                    <button disabled={!wallet.connected || loading} onClick={initializeCounter}>
                        Initialize
                    </button>
                    <button disabled={!wallet.connected || loading} onClick={incrementCounter}>
                        Increment
                    </button>
                </div>

                <section className="panel">
                    <p><strong>RPC:</strong> {connection.rpcEndpoint}</p>
                    <p><strong>Wallet:</strong> {wallet.publicKey?.toBase58() ?? "Bagli degil"}</p>
                    <p><strong>Provider:</strong> {provider ? "Hazir" : "Hazir degil"}</p>
                    <p><strong>Durum:</strong> {status}</p>
                </section>

                <section className="panel">
                    <h2>Counter</h2>
                    {counter ? (
                        <>
                            <p><strong>Authority:</strong> {counter.authority}</p>
                            <p><strong>Count:</strong> {counter.count}</p>
                            <p><strong>Bump:</strong> {counter.bump}</p>
                        </>
                    ) : (
                        <p>Counter verisi yok.</p>
                    )}
                </section>
            </main>
        </div>
    );
};

export default App;
