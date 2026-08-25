
<script></script>

<h2></h2>

<style>
    h2 {
      color: var(--colors-text);
      position: relative;
      padding: 0.5rem 0;
      margin-top: 0;
      margin-left: 0.5rem;
      padding-left: 1rem;
      padding-right: 1rem;
      background-color: var(--colors-elevation-2);
      width: min-content;
      box-shadow: var(--shadows-xs);

      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 5px;
        height: 100%;
        background-color: var(--colors-primary);
      }
    }
</style>