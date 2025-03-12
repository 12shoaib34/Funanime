"use client";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import themes from "@/theme";
import { GoDotFill } from "react-icons/go";
import Logo from "./Logo";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const currentTheme = themes[theme] || {};

  return (
    <div className="p-4">
      {/* Theme Selection Buttons */}
      <div className="flex gap-2 mt-2 flex-wrap justify-center">
        {Object.keys(themes).map((t) => {
          console.log(t);

          return (
            <button
              key={t}
              className="w-10 h-10 rounded-full overflow-hidden relative border-2 border-white hover:scale-110 transition-all"
              style={{ backgroundColor: themes[t]["--theme-primary"] }}
              onClick={() => toggleTheme(t)}
              title={t}
            >
              <span
                style={{
                  backgroundColor: themes[t]["--bg-primary"],
                }}
                className={`absolute top-0 left-0 -translate-x-1/2 w-full h-full `}
              ></span>
            </button>
          );
        })}
      </div>

      {/* Theme Preview Layout (400x400) */}
      <div className="mt-12 mx-auto text-foreground w-[400px] h-[400px] flex flex-col justify-between rounded-sm border border-border-primary overflow-hidden">
        <div>
          <div className="py-2 bg-bg-secondary">
            <div className="w-full flex justify-between items-center mx-auto px-2 max-w-[350px]">
              <div className="scale-75 origin-center -ml-3">
                <Logo />
              </div>
              <button className="rounded-md text-xs font-medium h-6 w-12 bg-button-primary-bg text-button-primary-text">
                Text
              </button>
            </div>
          </div>
          <div className="w-full mx-auto px-2 pt-6 max-w-[350px]">
            <div className="w-full h-18 rounded-md bg-bg-tertiary"></div>

            <div className="mt-4">
              <p className="text-foreground">Font color foreground</p>
              <p className="text-foreground-secondary">Font color secondary</p>
              <p className="text-foreground-tertiary">Font color tertiary</p>
            </div>
          </div>
        </div>

        <div
          className="h-22 flex items-center justify-center font-medium"
          style={{ backgroundColor: currentTheme["--bg-tertiary"], color: currentTheme["--foreground-secondary"] }}
        ></div>
      </div>
    </div>
  );
}
