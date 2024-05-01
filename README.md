# srt-to-vtt

A simple [Worker](https://developers.cloudflare.com/workers/) for converting SRT subtitles to WebVTT on the fly. Based on the built in converter from [OPlayer](https://github.com/shiyiya/oplayer/blob/main/packages/ui/src/components/Subtitle.utils.ts).

## Usage

```
https://<your-worker-url>.workers.dev/?url=<url-of-remote-srt>
```

### Example 

```
https://srt-to-vtt.streamnorth.ca/?url=https://durian.blender.org/wp-content/content/subtitles/sintel_en.srt
```
