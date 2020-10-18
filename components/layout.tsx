import Head from "next/head";
import Link from "next/link";

const name = "[Your Name]";
export const siteTitle = "Next.js Sample Website";

interface LayoutProps {
  children: React.ReactNode;
  home?: boolean;
}

export default function Layout({ children, home = false }: LayoutProps) {
  return (
    <div className="mx-auto mb-16" style={{ maxWidth: 400 }}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="mb-8 flex flex-col">
        {home ? (
          <>
            <img
              className="m-auto"
              src="/barmim-logo-symbol.svg"
              width={60}
              height={60}
            />

            <span className="font-bold text-indigo-400">بودكاست</span>
            <img
              src="/barmim-logo-text.svg"
              width={130}
              height={85}
              alt="برميم"
            />

            <p className="mt-4 text-gray-600 text-lg">
              برميم: اختصار من برمجة وتصميم.
              <br />
              نستضيف كل حلقة ضيف جديد، في البرمجة أو التصميم.
              <br />
              يقدمه أحمد الحداد، وموسى العطيه.
            </p>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img src="/barmim-logo-symbol.svg" width={60} height={60} />
                <span className="font-bold text-barmim-500">بودكاست برميم</span>
              </a>
            </Link>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className="mt-8">
          <Link href="/">
            <a className="px-2 py-1 bg-gray-200 rounded-lg">→ عودة</a>
          </Link>
        </div>
      )}
    </div>
  );
}
