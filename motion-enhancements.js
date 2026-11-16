/* Motion for JavaScript; progressive enhancement and accessible fallback. */
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  import("https://cdn.jsdelivr.net/npm/motion@14.11.1/+esm")
    .then(({ animate, inView, scroll }) => {
      const activated = new WeakSet();
      const init = () => {
        const targets = document.querySelectorAll('[data-motion], .portfolio-card');
        targets.forEach(el => {
          if(activated.has(el))return;
          activated.add(el);
          inView(el, () => {
            animate(el,{opacity:[.28,1],y:[36,0]},{duration:.88,ease:[.22,1,.36,1]});
          },{margin:"0px 0px -6% 0px",amount:.08});
        });
      };
      init();
      document.addEventListener("discourse:content-ready",init);
      const line=document.querySelector("#reading-progress");
      if(line && !document.querySelector(".case-document")) {
        // Existing lightweight scroll handler remains the fallback.
      }
    })
    .catch(() => {
      // CDN failure must never hide content or block navigation.
    });
}