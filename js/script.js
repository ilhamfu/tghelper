const DEFAULT_MAX_MINUTES = 60 * 24 - 1;
const DEFAULT_MIN_MINUTES = 0;


document.addEventListener("alpine:init", () => {
  Telegram.WebApp.ready();

  Alpine.data("clock", () => {
    let searchParam = new URLSearchParams(window.location.search);

    let max_minutes = parseInt(searchParam.get("max")) || DEFAULT_MAX_MINUTES;
    let min_minutes = parseInt(searchParam.get("min")) || DEFAULT_MIN_MINUTES;

    return {
      _minutes: min_minutes,
      init() {
        Telegram.WebApp.MainButton.setText("Ok").onClick(() => {
          this.submit();
        });
      },
      add_ten_hours() {
        this._minutes = Math.min(this._minutes + 600, max_minutes);
      },
      add_hour() {
        this._minutes = Math.min(this._minutes + 60, max_minutes);
      },
      add_ten_minutes() {
        this._minutes = Math.min(this._minutes + 10, max_minutes);
      },
      add_minute() {
        this._minutes = Math.min(this._minutes + 1, max_minutes);
      },
      sub_ten_hours() {
        this._minutes = Math.max(this._minutes - 600, min_minutes);
      },
      sub_hour() {
        this._minutes = Math.max(this._minutes - 60, min_minutes);
      },
      sub_ten_minutes() {
        this._minutes = Math.max(this._minutes - 10, min_minutes);
      },
      sub_minute() {
        this._minutes = Math.max(this._minutes - 1, min_minutes);
      },
      submit() {
        Telegram.WebApp.sendData(this._minutes);
      },
      get ten_hours() {
        return Math.floor(this._minutes / 600);
      },
      get hour() {
        return Math.floor(this._minutes / 60) % 10;
      },
      get ten_minutes() {
        return Math.floor(this._minutes / 10) % 6;
      },
      get minute() {
        return this._minutes % 10;
      },
    };
  });
});
