import Button from "../components/Button";

export default function Test() {
  return (
    <main className="min-h-screen p-12 space-y-4">
      <div className="space-y-3 border-b border-black py-4">
        <h2>Les boutons</h2>
        <div className="flex items-center justify-start space-x-4">
          <Button color="primary" text="Click me!" size="small" icon="lets-icons:send-fill" />
          <Button
            color="secondary"
            text="Click me!"
            size="small"
            icon="lets-icons:check-fill"
          />
          <Button color="or" text="Click me!" size="small" />
        </div>
        <div className="flex items-center justify-start space-x-4 ">
          <Button color="primary" text="Click me!" />
          <Button color="secondary" text="Click me!" icon="lets-icons:check-fill" />
          <Button color="or" text="Click me!" icon="ph:video" />
        </div>
        <div className="flex items-center justify-start space-x-4 ">
          <Button color="primary" text="Click me!" size="large" icon="lets-icons:send-fill" />
          <Button color="secondary" text="Click me!" size="large" />
          <Button color="or" text="Click me!" size="large" icon="ph:video" />
        </div>
      </div>
      <div className="space-y-3 border-b border-black py-4">
        <h2>Les titres</h2>
        <h1>&lt;h1&gt;... Titre principal</h1>
        <h2>&lt;h2&gt;... Titre de section</h2>
        <h3>&lt;h3&gt;... Titre de section</h3>
        <h4>&lt;h4&gt;... Titre de section</h4>
        <h5>&lt;h5&gt;... Titre de section</h5>
        <h6>&lt;h6&gt;... Titre de section</h6>
        <p>
          &lt;p&gt;... Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur
        </p>
      </div>
    </main>
  );
}
