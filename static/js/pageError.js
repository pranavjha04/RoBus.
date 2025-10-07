export class PageError {
  static showOperatorError() {
    const parent = document.querySelector("#pageWrapper");
    if (!parent) throw new Error("Page Wrapper Not Present");
    parent.innerHTML = this.#getOperatorErrorHTML();
  }
  static #getOperatorErrorHTML() {
    return ` <div
            class="d-flex flex-column align-items-center justify-content-center h-100"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 250 125"
                style="width: 700px; height: auto"
              >
                <g transform="rotate(-5, 83,62.5)">
                  <rect
                    x="42"
                    y="42"
                    width="146"
                    height="50"
                    rx="6"
                    fill="#1976d2"
                    stroke="#0d47a1"
                    stroke-width="2"
                  />

                  <rect
                    x="54"
                    y="48"
                    width="29"
                    height="21"
                    rx="2"
                    fill="#64b5f6"
                    stroke="#0d47a1"
                    stroke-width="1"
                  />
                  <rect
                    x="88"
                    y="48"
                    width="29"
                    height="21"
                    rx="2"
                    fill="#64b5f6"
                    stroke="#0d47a1"
                    stroke-width="1"
                  />
                  <rect
                    x="121"
                    y="48"
                    width="29"
                    height="21"
                    rx="2"
                    fill="#64b5f6"
                    stroke="#0d47a1"
                    stroke-width="1"
                  />
                  <rect
                    x="154"
                    y="48"
                    width="25"
                    height="21"
                    rx="2"
                    fill="#64b5f6"
                    stroke="#0d47a1"
                    stroke-width="1"
                  />

                  <circle cx="75" cy="87.5" r="9" fill="#212121" />
                  <circle cx="154" cy="87.5" r="9" fill="#212121" />
                </g>

                <polygon
                  points="33,42 42,50 39,62.5 36,75 21,71 17,54"
                  fill="#0d47a1"
                  stroke="#08306b"
                  stroke-width="2"
                />

                <line
                  x1="58"
                  y1="52"
                  x2="48"
                  y2="44"
                  stroke="white"
                  stroke-width="1"
                />
                <line
                  x1="67"
                  y1="54"
                  x2="56"
                  y2="64"
                  stroke="white"
                  stroke-width="1"
                />
                <line
                  x1="62.5"
                  y1="58"
                  x2="71"
                  y2="67"
                  stroke="white"
                  stroke-width="1"
                />
                <line
                  x1="79"
                  y1="50"
                  x2="73"
                  y2="61"
                  stroke="white"
                  stroke-width="1"
                />

                <!-- Broken glass shards -->
                <polygon points="25,62.5 29,54 21,50" fill="#64b5f6" />
                <polygon points="23,73 31,77 19,79" fill="#64b5f6" />
                <polygon points="37.5,79 42,83 33,87.5" fill="#64b5f6" />

                <!-- Ground debris -->
                <rect x="25" y="92" width="6" height="2.5" fill="#0d47a1" />
                <rect x="37.5" y="94" width="5" height="2" fill="#0d47a1" />
                <polygon points="50,92 54,94 48,96" fill="#1976d2" />
              </svg>
            </div>

            <div class="mt-3 text-center">
              <h4 class="fs-1">Oops! Something went wrong</h4>
              <p class="text-muted fs-5">
                We encountered an error. Please try again later.
              </p>
            </div>
          </div>`;
  }
}
